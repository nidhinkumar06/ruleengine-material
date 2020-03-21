import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular9-query-builder';
import { Router, ActivatedRoute } from '@angular/router';
import { RuleService } from '../rule.service';

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
        entity: 'action'
      },
      log: {
        name: 'Log',
        type: 'string',
        entity: 'action'
      }
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
        this.query.condition = rule.condition;
        this.query.rules = rule.rules;
      }
      this.isPageLoading = false;
    }, error => {
      console.log('error is', error);
      this.isPageLoading = false;
    });
  }

  saveRule() {
    console.log('rule is', this.query);
    const params = {
      sqlRuleDetail: {
        rule_id: this.ruleId,
        rule: this.query
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
    console.log('params is', params);
  }

  updateRule() {
    console.log('update rule is', this.query);

    const params = {
      sqlRuleDetail: {
        rule_id: this.ruleId,
        rule: this.query
      }
    };
    this.isPageLoading = true;
    this.ruleService.updateSqlBuilder(params, this.ruleId).subscribe(() => {
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
