import React, { useRef, useEffect, useCallback } from 'react';
import functionPlot from "function-plot";
import { easing } from "react-animation";

export default function Easin(){
  const targetRef = useRef(null);

  const getRect = useCallback((node: Element) => {
    const contentsBounds = node.getBoundingClientRect();
    let width = 800;
    let height = 500;
    const ratio = contentsBounds.width / width;
    width *= ratio;
    height *= ratio;

    return {
      width,
      height,
    };
  }, []);

  const renderFn = useCallback((node: any) => {
    functionPlot({
      target: node,
      ...getRect(node),
      xAxis: { 
        label: '过渡时间百分比',
        domain: [0, 1] 
      },
      yAxis: { 
        label: '位移百分比',
        domain: [-0.4, 1] 
      },
      grid: true,
      disableZoom: true,
      data: [
        {
          graphType: 'polyline', 
          color: '#9e45d4',
          fn: function (scope) {
            return easing.easeInSine(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#4569d4',
          fn: function (scope) {
            return easing.easeInQuad(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#4569d4',
          fn: function (scope) {
            return easing.easeInCubic(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#4569d4',
          fn: function (scope) {
            return easing.easeInQuart(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#4569d4',
          fn: function (scope) {
            return easing.easeInQuint(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#45d457',
          fn: function (scope) {
            return easing.easeInCirc(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#45d457',
          fn: function (scope) {
            return easing.easeInEppo(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#d46d45',
          fn: function (scope) {
            return easing.easeInElastic(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#45d3d4',
          fn: function (scope) {
            return easing.easeInBack(scope.x);
          }
        },
        {
          graphType: 'polyline',
          color: '#d46d45',
          fn: function (scope) {
            return easing.easeInBounce(scope.x);
          }
        },
      ]
    });
  }, [getRect]);

  useEffect(() => {
    setTimeout(() => {
      renderFn(targetRef.current!);
    }, 0);
  }, [renderFn, targetRef]);

  return (
    <div ref={targetRef} />
  );
};