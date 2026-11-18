export interface PhantomDiagramProps {
  selectedId: string | null;
  correctId: string | null;
  wrongId: string | null;
  flowHighlightIds?: string[];
  showLabels: boolean;
  onSelectOrgan: (organId: string) => void;
  onHoverOrgan?: (organId: string | null) => void;
}

export function getOrganClass(
  organId: string,
  props: Pick<PhantomDiagramProps, 'selectedId' | 'correctId' | 'wrongId' | 'flowHighlightIds'>
): string {
  const classes = ['phantom-organ'];
  if (props.correctId === organId) {
    classes.push('is-correct');
  } else if (props.wrongId === organId) {
    classes.push('is-wrong');
  } else if (props.selectedId === organId || props.flowHighlightIds?.includes(organId)) {
    classes.push('is-selected');
  }
  return classes.join(' ');
}

export function getStrokeOverlay(
  organId: string,
  defaultStroke: string,
  defaultWidth: number,
  props: Pick<PhantomDiagramProps, 'selectedId' | 'correctId' | 'wrongId' | 'flowHighlightIds'>
): { stroke: string; strokeWidth: number } {
  if (props.correctId === organId) {
    return { stroke: '#059669', strokeWidth: defaultWidth + 2.5 };
  }
  if (props.wrongId === organId) {
    return { stroke: '#DC2626', strokeWidth: defaultWidth + 2.5 };
  }
  if (props.selectedId === organId || props.flowHighlightIds?.includes(organId)) {
    return { stroke: '#0284C7', strokeWidth: defaultWidth + 2 };
  }
  return { stroke: defaultStroke, strokeWidth: defaultWidth };
}
