import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import TabsPanes from '..';

const pane1 = { id: 'tab1', content: 'Pane 1 Поиск' };
const pane2 = { id: 'tab2', content: 'Pane 2 Картинки' };
const pane3 = { id: 'tab3', content: <div>Pane 3 Маркет</div> };

const panes = [pane1, pane2, pane3];

describe('TabsPanes', () => {
  test('should return the complete component template (snapshot)', () => {
    expect(render(<TabsPanes activePane={pane1.id} panes={panes} className="mix" />)).toMatchSnapshot();
  });
  
  test('should set a reference to the root DOM element', async () => {
    const innerRef = createRef<HTMLDivElement>();
    render(<TabsPanes activePane={pane1.id} panes={panes} innerRef={innerRef} />);
  
    expect(innerRef.current).not.toBe(null);
  });
  
  test('should display only the active pane content (snapshot)', () => {
    expect(render(<TabsPanes activePane={pane1.id} panes={panes} />)).toMatchSnapshot();
  });
  
  test('should display new JSX content when activePane changes (snapshot)', () => {
    const { container, rerender } = render(<TabsPanes activePane={pane1.id} panes={panes} />);
    rerender(<TabsPanes activePane={pane3.id} panes={panes} />);
    expect(container).toMatchSnapshot();
  });
  
  test('should render an empty panel when activePane is not set', () => {
    render(<TabsPanes activePane={undefined} panes={panes} />);
    const tabpanes = screen.getByRole('menutabpanes');
    expect(tabpanes.childNodes.length).toBe(0);
  });

});
