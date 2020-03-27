import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular9-query-builder';
import { Router, ActivatedRoute } from '@angular/router';
import { RuleService } from '../rule.service';
import { flattenDeep, flatMapDeep } from 'lodash';

@Component({
  selector: 'app-sqlbuilder',
  templateUrl: './sqlbuilder.component.html',
  styleUrls: ['./sqlbuilder.component.scss']
})
export class SqlbuilderComponent implements OnInit {

  ruleName: string;
  ruleId: number;
  hasRule = false;
  isPageLoading = false;
  ruleDataId: number;
  newOne = [];

  existingRule: any = {
    condition: '',
    rules: []
  };

  constructor(private router: Router, private route: ActivatedRoute, private ruleService: RuleService, private toast: ToastrService) { }

  query = {
    condition: 'and',
    rules: [],
  };

  config: QueryBuilderConfig = {
    fields: {
      deviceName: {
        name: 'Device Name',
        type: 'category',
        options: [
          {name: 'Device01', value: 'device01' },
          {name: 'Device02', value: 'device02' },
          {name: 'Device03', value: 'device03' },
          {name: 'Device04', value: 'device04' },
          {name: 'Device05', value: 'device05' }
        ]
      },
      temperature: { name: 'Temperature', type: 'number' },
      voltage: { name: 'Voltage', type: 'number' },
      mail: {
        name: 'Mail',
        type: 'string',
        operators: ['to'],
      },
      // log: {
      //   name: 'Log',
      //   type: 'string',
      // }
    }
  };

  ngOnInit(): void {
    this.isPageLoading = true;
    this.ruleName = localStorage.getItem('RULE_NAME');
    this.route.params.subscribe(params => {
      this.ruleId = params.id;
    });
    const ruleIdParams = {
      rule_id: this.ruleId
    };
    this.ruleService.fetchSqlBuilderById(ruleIdParams).subscribe(data => {
      if (data.length > 0) {
        this.hasRule = true;
        const rule = data[0].rule;
        this.ruleDataId = data[0].id;
        this.query.condition = rule.condition;

        if (rule.ruleType === 'multiple') {
          this.convertRule(rule);
          this.query.rules = this.existingRule.rules;
        } else {
          const temp = rule && rule.rules.map((existingRule: any) => {
            return existingRule.condition;
          });
          this.query.rules = temp;
        }
      }
      this.isPageLoading = false;
    }, error => {
      this.isPageLoading = false;
    });
  }

  convertRule(data) {
    const temprule = [];
    this.existingRule.condition = data.condition;
    data.rules.forEach((rule) => {
      console.log('rule is', rule);
      if (rule) {
        if (rule.rules) {
          this.convertRule(rule);
        } else {
          temprule.push(rule.condition);
        }
        if (data.rules.length === temprule.length) {
          this.existingRule.rules.push(
            {
              condition: data.condition,
              rules: temprule,
            });
        }
      }
    });
  }

  saveRule() {
    this.findObjectByLabel(this.query);
    let ruleType = '';
    if (this.newOne.length > 0) {
      ruleType = 'multiple';
    } else {
      ruleType = 'single';
    }

    const updatedQuery = {
      condition: this.query.condition,
      rules: this.newOne,
      ruleType
    };
    // const queryDetail = this.query.rules.map((query: any) => {
    //   const temp: any = {
    //     condition: {
    //       ...query
    //     }
    //   };
    //   if (query.field === 'mail' || query.field === 'log') {
    //     temp.type = 'action';
    //   } else {
    //     temp.type = 'condition';
    //   }
    //   return temp;
    // });

    // console.log('queryDetail', queryDetail);


    // const updatedQuery = {
    //   condition: this.query.condition,
    //   rules: queryDetail
    // };

    const params = {
      sqlRuleDetail: {
        rule_id: this.ruleId,
        rule: updatedQuery
      }
    };
    this.isPageLoading = true;
    this.ruleService.createSqlBuilder(params).subscribe(result => {
      this.isPageLoading = false;
      this.toast.success('Rule created successfully');
      this.goBack();
    }, error => {
      this.toast.error(error.message);
      this.isPageLoading = false;
    });
  }

  findObjectByLabel(data) {
    const rules: any = [];
    data.rules.forEach((rule, index) => {
      if (rule.rules) {
        this.findObjectByLabel(rule);
      } else {
        rules[index] = {
          condition: {
            field: rule.field,
            operator: rule.operator,
            value: rule.value
          },
          type: rule.field === 'mail' || rule.field === 'log' ? 'action' : 'condition'
        };
      }
    });
    if (rules.length > 0) {
      this.newOne.push({
        condition: data.condition,
        rules
      });
    }
  }


  updateRule() {
    // const queryDetail = this.query.rules.map((query: any) => {
    //   const temp: any = {
    //     condition: {
    //       ...query
    //     }
    //   };
    //   if (query.field === 'mail' || query.field === 'log') {
    //     temp.type = 'action';
    //   } else {
    //     temp.type = 'condition';
    //   }
    //   return temp;
    // });
    // const updatedQuery = {
    //   condition: this.query.condition,
    //   rules: queryDetail
    // };

    this.findObjectByLabel(this.query);
    let ruleType = '';
    if (this.newOne.length > 0) {
      ruleType = 'multiple';
    } else {
      ruleType = 'single';
    }

    const updatedQuery = {
      condition: this.query.condition,
      rules: this.newOne,
      ruleType
    };

    const params = {
      sqlRuleDetail: {
        rule_id: this.ruleId,
        rule: updatedQuery
      }
    };
    console.log('params is', params);
    this.isPageLoading = true;
    this.ruleService.updateSqlBuilder(params, this.ruleDataId).subscribe(() => {
      this.isPageLoading = false;
      this.toast.success('Sql builder updated successfully');
      this.goBack();
    }, error => {
      this.toast.error(error.message);
      this.isPageLoading = false;
    });
  }

  goBack() {
    this.router.navigate(['/list']);
  }

}
