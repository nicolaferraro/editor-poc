import React, { DragEvent } from 'react';
import Catalog from '../contexts/Catalog';
import { getKameletType, KameletIconAnnotation } from '../models/kamelet';
import './Sidebar.css';

const onDragStart = (event: DragEvent, nodeType: string, label: string, icon: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.setData('application/reactflow/label', label);
  event.dataTransfer.setData('application/reactflow/icon', icon);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {

  let items = (
    <Catalog.Consumer>
    {
      (catalog) => catalog.items.map(k => {
        let title = k.spec.definition.title || k.metadata.name
        let kameletType = getKameletType(k)
        let flowType: string
        let flowClass: string
        switch(kameletType) {
            case "source":
                flowType = 'input';
                flowClass = 'KameletNode dndnode input';
                break;
            case "sink":
                flowType = 'output';
                flowClass = 'KameletNode dndnode output';
                break;
            default:
                flowType = 'default';
                flowClass = 'KameletNode dndnode';
        }
        let icon = k.metadata.annotations[KameletIconAnnotation]
        return (
            <div key={k.metadata.name} className={flowClass} onDragStart={(event: DragEvent) => onDragStart(event, flowType, title, icon)} draggable>
                <img src={icon} />
                <span>{title}</span>
            </div>
        );
      })
    }
    </Catalog.Consumer>
  );

  return (
    <aside>
      <div className="description">Kamelet catalog:</div>
      {items}
    </aside>
  );
};

/*
<div className="dndnode input" onDragStart={(event: DragEvent) => onDragStart(event, 'input')} draggable>
Input Node
</div>
<div className="dndnode" onDragStart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
Default Node
</div>
<div className="dndnode output" onDragStart={(event: DragEvent) => onDragStart(event, 'output')} draggable>
Output Node
</div>
*/

export default Sidebar;