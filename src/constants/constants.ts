import { FlowchartConstants } from '../flowchart/ngx-flowchart.models';
import { Colors } from './colors';

export const CONDITION_DATA = [
  {
    name: 'and',
    id: '1',
    x: 25,
    y: 75 * 1,
    color: Colors.SECONDARY,
    icon: '&',
    type: 'condition',
    connectors: [
      {
        type: FlowchartConstants.leftConnectorType,
        id: (1 * 1 + 1) + ''
      },
      {
        type: FlowchartConstants.rightConnectorType,
        id: (1 * 1 + 2) + ''
      }
    ]
  },
  {
    name: 'or',
    id: '2',
    x: 25,
    y: 75 * 2,
    color: Colors.SECONDARY,
    icon: '||',
    type: 'condition',
    connectors: [
      {
        type: FlowchartConstants.leftConnectorType,
        id: (2 * 2 + 1) + ''
      },
      {
        type: FlowchartConstants.rightConnectorType,
        id: (2 * 2 + 2) + ''
      }
    ]
  },
];

export const ENRICHMENT_NODE_DATA = [
  {
    name: 'equal',
    id: '1',
    x: 25,
    y: 75 * 1,
    color: Colors.PRIMARY,
    icon: '=',
    type: 'node',
    connectors: [
      {
        type: FlowchartConstants.leftConnectorType,
        id: (1 * 2 + 1) + ''
      },
      {
        type: FlowchartConstants.rightConnectorType,
        id: (1 * 2 + 2) + ''
      }
    ]
  },
  {
    name: 'notEqual',
    id: '2',
    x: 25,
    y: 75 * 2,
    color: Colors.PRIMARY,
    icon: '≠',
    type: 'node',
    connectors: [
      {
        type: FlowchartConstants.leftConnectorType,
        id: (2 * 2 + 1) + ''
      },
      {
        type: FlowchartConstants.rightConnectorType,
        id: (2 * 2 + 2) + ''
      }
    ]
  },
  {
    name: 'greaterThan',
    id: '3',
    x: 25,
    y: 75 * 3,
    color: Colors.PRIMARY,
    icon: '>',
    type: 'node',
    connectors: [
      {
        type: FlowchartConstants.leftConnectorType,
        id: (3 * 2 + 1) + ''
      },
      {
        type: FlowchartConstants.rightConnectorType,
        id: (3 * 2 + 2) + ''
      }
    ]
  },
  {
    name: 'lessThan',
    id: '4',
    x: 25,
    y: 75 * 4,
    color: Colors.PRIMARY,
    icon: '<',
    type: 'node',
    connectors: [
      {
        type: FlowchartConstants.leftConnectorType,
        id: (4 * 2 + 1) + ''
      },
      {
        type: FlowchartConstants.rightConnectorType,
        id: (4 * 2 + 2) + ''
      }
    ]
  },
  {
    name: 'greaterThanEqual',
    id: '5',
    x: 25,
    y: 75 * 5,
    color: Colors.PRIMARY,
    icon: '≥',
    type: 'node',
    connectors: [
      {
        type: FlowchartConstants.leftConnectorType,
        id: (5 * 2 + 1) + ''
      },
      {
        type: FlowchartConstants.rightConnectorType,
        id: (5 * 2 + 2) + ''
      }
    ]
  },
  {
    name: 'lessThanEqual',
    id: '6',
    x: 25,
    y: 75 * 6,
    color: Colors.PRIMARY,
    icon: '≤',
    type: 'node',
    connectors: [
      {
        type: FlowchartConstants.leftConnectorType,
        id: (6 * 2 + 1) + ''
      },
      {
        type: FlowchartConstants.rightConnectorType,
        id: (6 * 2 + 2) + ''
      }
    ]
  },
];
