import { init } from "echarts";
import type { EChartsOption, ECharts } from "echarts";
import { useEffect, useRef } from "react";

export interface ChartProps {
  option: EChartsOption;
}

export const Chart = ({ ...props }: ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  let chart: ECharts | undefined;

  useEffect(() => {
    if (chartRef.current) {
      const chart = init(chartRef.current);
      chart.setOption(props.option);
    }
    return () => {
      chart?.dispose()
    }
  }, [props.option])

  return (
    <div ref={chartRef} style={{ width: "100%", height: "300px" }}/>
  )
}