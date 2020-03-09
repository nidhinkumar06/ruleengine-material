import { Component, OnInit, HostBinding, ViewChild, HostListener } from '@angular/core';
import { RuleService } from '../rule.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { of } from 'rxjs';
import { map, some } from 'lodash';
import { ENRICHMENT_NODE_DATA } from 'src/constants/constants';
import { DELETE } from '@angular/cdk/keycodes';
import { EdgedialogComponent } from '../edgedialog/edgedialog.component';
import { RuledialogComponent } from '../ruledialog/ruledialog.component';
import { FlowchartConstants, FcModel, UserCallbacks, FcNode } from '../../../flowchart/ngx-flowchart.models';
import { NgxFlowchartComponent } from '../../../flowchart/ngx-flowchart.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  @HostBinding('attr.tabindex')
  get tabindex(): string {
    return '0';
  }

  constructor(
    private ruleService: RuleService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.enrichmentTypesModel.nodes.push(...ENRICHMENT_NODE_DATA);
    this.initData();
  }

  flowchartConstants = FlowchartConstants;

  nodeTypesFlowchartselected = [];

  actionTypesModel: FcModel = {
    nodes: [],
    edges: []
  };

  enrichmentTypesModel: FcModel = {
    nodes: [],
    edges: []
  };

  flowchartselected = [];

  model: FcModel = {
    nodes: [],
    edges: []
  };

  nextNodeID = 10;
  nextConnectorID = 20;

  ruleId: number;
  ruleDataId: number;
  isPageLoading = false;
  hasRule = false;

  callbacks: UserCallbacks = {
    edgeDoubleClick: (event, edge) => {},
    edgeEdit: (event, edge) => {
      this.openEdgeDialog(edge);
    },
    edgeMouseOver: event => {},
    isValidEdge: (source, destination) => {
      return source.type === FlowchartConstants.rightConnectorType && destination.type === FlowchartConstants.leftConnectorType;
    },
    createEdge: (event, edge) => {
      edge.label = 'Yes';
      this.openEdgeDialog(edge);
      return of(edge);
    },
    dropNode: (event, node) => {
      if (node.type === 'node') {
        this.openDialog(node);
      } else {
        this.saveModal(node);
      }
    },
    edgeAdded: edge => {},
    nodeRemoved: node => {},
    edgeRemoved: edge => {},
    nodeCallbacks: {
      doubleClick: event => {},
      nodeEdit: (event, node) => {
        if (node.type === 'node') {
          this.openDialog(node);
        } else {
          this.saveModal(node);
        }
      }
    }
  };

  @ViewChild('fcCanvas', {static: true}) fcCanvas: NgxFlowchartComponent;


  openDialog(node: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: node.name,
      fact: node.conditions && node.conditions.fact || '',
      operator: node.conditions && node.conditions.operator || '',
      value: node.conditions && node.conditions.value || '',
    };

    const dialogRef = this.dialog.open(RuledialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        node.id = (this.nextNodeID++) + '';
        node.name = result.fact;

        node.conditions = result;
        node.connectors = [
          {
            id: (this.nextConnectorID++) + '',
            type: FlowchartConstants.leftConnectorType
          },
          {
            id: (this.nextConnectorID++) + '',
            type: FlowchartConstants.rightConnectorType
          }
        ];
        //add the condition to remove duplicate values
        this.model.nodes.push(node);
      });
  }

  openEdgeDialog(edge: any) {
    const edgeDialogConfig = new MatDialogConfig();

    edgeDialogConfig.disableClose = true;
    edgeDialogConfig.autoFocus = true;

    edgeDialogConfig.data = {
      option:  edge.label || 'Yes',
    };

    const dialogRef = this.dialog.open(EdgedialogComponent, edgeDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      map(this.model.nodes, (node: any) => {
        const isSourceIdMatches = some(node.connectors, {id: edge.source});
        const isDestinationIdMatches = some(node.connectors, {id: edge.destination});
        if (isSourceIdMatches) {
          edge.source_id = node.id;
          edge.source_condition = node.conditions;
          edge.source_type = node.type;
        }

        if (isDestinationIdMatches) {
          edge.destination_id = node.id;
          edge.destination_type = node.type;
          if (node.type === 'action') {
            edge.destination_action = node.name;
          }
        }
      });
      edge.label = result;
    });

  }

  saveModal(node: any) {
    node.id = (this.nextNodeID++) + '';
    node.connectors = [
      {
        id: (this.nextConnectorID++) + '',
        type: FlowchartConstants.leftConnectorType
      }
    ];
    this.model.nodes.push(node);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}

  createActionData(actionDatas: any) {
    actionDatas.map((data, index) => {
      const actionNode: FcNode = {
        name: data.name,
        id: data.id + '',
        x: 25,
        y: 75 * (index + 1),
        color: '#DEC111',
        icon: 'flash_on',
        type: 'action',
        connectors: [
          {
            type: FlowchartConstants.leftConnectorType,
            id: (index * 2 + 1) + ''
          }
        ]
      };

      this.actionTypesModel.nodes.push(actionNode);
    });
  }

  initData() {
    this.isPageLoading = true;
    this.route.params.subscribe(params => {
      this.ruleId = params.id;
    });

    this.ruleService.fetchActions().subscribe(data => {
      this.createActionData(data);
    }, error => {
      console.log('error in fetchActions', error);
    });
    const ruleIdParams = {
      rule_id: this.ruleId
    };
    this.ruleService.fetchRuleById(ruleIdParams).subscribe(data => {
      console.log('this.model is', this.model);
      if (data.length > 0) {
        this.hasRule = true;
        const rule  = data[0].rule;
        this.ruleDataId = data[0].id;
        console.log('rule is', rule);
        this.model.nodes.push(...rule.nodes);
        this.model.edges.push(...rule.edges);
      }
      this.isPageLoading = false;
    }, error => {
     this.isPageLoading = false;
    });
  }

  @HostListener('keydown.control.a', ['$event'])
  public onCtrlA(event: KeyboardEvent) {
    this.fcCanvas.modelService.selectAll();
  }

  @HostListener('keydown.esc', ['$event'])
  public onEsc(event: KeyboardEvent) {
    this.fcCanvas.modelService.deselectAll();
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent) {
    if (event.keyCode === DELETE) {
      this.fcCanvas.modelService.deleteSelected();
    }
  }

  saveRule() {
    const params = {
      ruleDetail: {
        rule_id: this.ruleId,
        rule: this.model
      }
    };
    this.isPageLoading = true;
    this.ruleService.createRuleEngine(params).subscribe(result => {
     this.isPageLoading = false;
     this.toast.success('Rule created successfully');
     this.goBack();
    }, error => {
      this.isPageLoading = false;
      this.toast.error(error.message);
    });
  }

  updateRule() {
    const params = {
      ruleDetail: {
        rule_id: this.ruleId,
        rule: this.model
      }
    };
    this.isPageLoading = true;
    console.log('ruleDataid', this.ruleDataId);
    console.log('updated model is', this.model);
    // this.ruleService.updateRuleEngine(params, this.ruleDataId).subscribe(result => {
    //   this.isPageLoading = false;
    //   this.toast.success('Rule updated successfully');
    //   this.goBack();
    // }, error => {
    //   this.isPageLoading = false;
    //   this.toast.error(error.message);
    // });
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
