import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import TabsPanels from '..';

const panel1 = { id: 'tab1', content: 'Pane 1 Поиск' };
const panel2 = { id: 'tab2', content: 'Pane 2 Картинки' };
const panel3 = { id: 'tab3', content: <div>Pane 3 Маркет</div> };

const panels = [panel1, panel2, panel3];

describe('TabsPanels', () => {
  test('should return the complete component template (snapshot)', () => {
    expect(render(<TabsPanels activePanel={panel1.id} panels={panels} className="mix" />)).toMatchSnapshot();
  });
  
  test('should set a reference to the root DOM element', async () => {
    const innerRef = createRef<HTMLDivElement>();
    render(<TabsPanels activePanel={panel1.id} panels={panels} innerRef={innerRef} />);
  
    expect(innerRef.current).not.toBe(null);
  });
  
  test('should display only the active pane content (snapshot)', () => {
    expect(render(<TabsPanels activePanel={panel1.id} panels={panels} />)).toMatchSnapshot();
  });
  
  test('should display new JSX content when activePane changes (snapshot)', () => {
    const { container, rerender } = render(<TabsPanels activePanel={panel1.id} panels={panels} />);
    rerender(<TabsPanels activePanel={panel3.id} panels={panels} />);
    expect(container).toMatchSnapshot();
  });
  
  test('should render an empty panel when activePane is not set', () => {
    render(<TabsPanels activePanel={undefined} panels={panels} />);
    expect(screen.queryByRole('menutabpanels')).toBeNull();
  
  });
});
