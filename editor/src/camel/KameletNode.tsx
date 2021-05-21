import React, { memo, FC, CSSProperties, ReactNode } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

import './KameletNode.css';


const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const KameletNode: FC<NodeProps> = ({ type, data }) => {

    let conn: ReactNode
    if (type != 'input') {
        conn = (
            <Handle type="target" position={Position.Left} className="KameletNode-Sink-Handler" onConnect={onConnect} />
        )
    }

    return (
        <>
          {conn}
          <div className="KameletNode">
            <img src={data.icon} />
            <span className="KameletNode-Label">{data.label}</span>
          </div>
          <Handle type="source" position={Position.Right} className="KameletNode-Sink-Handler" />
        </>
      );
  };

export default memo(KameletNode);
