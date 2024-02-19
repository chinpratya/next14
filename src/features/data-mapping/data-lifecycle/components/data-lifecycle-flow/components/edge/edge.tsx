import { EdgeProps, getSmoothStepPath } from 'reactflow';

export const Edge = ({ id, ...props }: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    ...props,
  });

  return (
    <>
      <path
        id={id}
        style={{
          stroke: '#000',
          strokeWidth: 3,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        fill="black"
        markerEnd={props.markerEnd}
      />
    </>
  );
};
