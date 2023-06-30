import React, { useState, useEffect, useRef } from 'react';
import showPoint from '@/utils/gsap/showPoint';
import hidePoint from '@/utils/gsap/hidePoint';
import showPointLabel from '@/utils/gsap/showPointLabel';
import changePointZPosition from '@/utils/gsap/changePointZPosition';
import rotatePoints from '@/utils/gsap/rotatePoints';
import matrixToDegrees from '@/utils/matrixToDegrees';
import getNearestPointIndex from '@/utils/getNearestPointIndex';
import getActualPointIndex from '@/utils/getActualPointIndex';

function TimeIntervals() {
  // задаём рефы для основных элементов
  const ancestorRef = useRef<HTMLDivElement | null>(null);
  const activePointNumberRef = useRef<HTMLElement | null>(null);
  const activePointRef = useRef<HTMLDivElement | null>(null);
  const prevPointNumberRef = useRef<HTMLElement | null>(null);
  const prevPointRef = useRef<HTMLDivElement | null>(null);
  const pointsQuantity = 6;

  useEffect(() => {
    // показываем первый пойнт при первой загрузке компонента
    showPoint({
      point: prevPointRef.current as HTMLDivElement,
      pointNumber: prevPointNumberRef.current as HTMLElement,
      animate: false,
    });
    showPointLabel({
      label: prevPointRef.current?.querySelector('.point-label') as HTMLElement,
      animate: false,
    });

    // находим центр окружности
    const circle = ancestorRef.current as HTMLElement;
    const circleX =
      circle?.getBoundingClientRect().left + circle.offsetWidth / 2;
    const circleY =
      circle?.getBoundingClientRect().top +
      circle.offsetHeight / 2 +
      window.scrollY;

    function handleMouseMove(
      e: MouseEvent,
      {
        circleX,
        circleY,
        pointsQuantity,
      }: { circleX: number; circleY: number; pointsQuantity: number },
    ) {
      const currentElement = e.target as HTMLElement;

      const isPointNumber = currentElement.classList.contains('point-number');

      // если найден номер пойнта и он не является последним выбранным или активным, то показываем его и записываем
      if (isPointNumber) {
        if (
          currentElement !== prevPointNumberRef.current &&
          currentElement !== activePointNumberRef.current
        ) {
          activePointNumberRef.current = currentElement as HTMLElement;
          showPoint({
            point: activePointRef.current as HTMLDivElement,
            pointNumber: activePointNumberRef.current,
          });
        }

        return;
      }

      // иначе опускаем предыдущий пойнт вниз по оси Z
      if (activePointRef.current) {
        changePointZPosition({
          point: activePointRef.current,
          direction: 'down',
        });
      }

      activePointRef.current = null;

      // находим ближайший пойнт и поднимаем его вверх по оси Z, чтобы получить его номер через e.target в будущем
      const firstPointNumber = Number(prevPointNumberRef.current?.innerText);

      const nearestPointIndex = getNearestPointIndex({
        ax: circleX,
        ay: circleY,
        bx: e.pageX,
        by: e.pageY,
      });

      const actualNearestPointIndex = getActualPointIndex({
        index: nearestPointIndex,
        pointsQuantity: pointsQuantity,
        firstPointNumber: firstPointNumber,
      });

      const actualPoint = ancestorRef.current?.querySelector(
        `.point${actualNearestPointIndex}`,
      ) as HTMLDivElement;

      changePointZPosition({ point: actualPoint, direction: 'up' });

      activePointRef.current = actualPoint;

      // если есть активный пойнт, то прячем его
      if (activePointNumberRef.current !== null) {
        hidePoint({
          point: activePointRef.current as HTMLDivElement,
          pointNumber: activePointNumberRef.current,
        });
        activePointNumberRef.current = null;
      }
    }

    function handleClick(mouseMoveHandler: (e: MouseEvent) => void) {
      if (
        activePointNumberRef.current !== null &&
        activePointRef.current !== null
      ) {
        ancestorRef.current?.removeEventListener('mousemove', mouseMoveHandler);

        const chosenPosition = matrixToDegrees(
          window.getComputedStyle(activePointRef.current).transform,
        );
        const points = ancestorRef.current?.querySelectorAll(
          '.time-intervals__point',
        ) as NodeListOf<Element>;
        const rotationDuration = 1;

        rotatePoints({
          chosenPosition: chosenPosition,
          activePointNumber: activePointNumberRef.current,
          prevPoint: prevPointRef.current as HTMLDivElement,
          prevPointNumber: prevPointNumberRef.current as HTMLElement,
          points: points,
          pointsQuantity: points.length,
          duration: rotationDuration,
        });

        prevPointNumberRef.current = activePointNumberRef.current;
        prevPointRef.current = activePointRef.current;
        activePointRef.current = null;
        activePointNumberRef.current = null;

        setTimeout(() => {
          const activePointLabel = prevPointRef.current?.querySelector(
            '.point-label',
          ) as HTMLElement;

          showPointLabel({
            label: activePointLabel,
          });

          ancestorRef.current?.addEventListener('mousemove', (e) =>
            handleMouseMove(e, { circleX, circleY, pointsQuantity }),
          );
        }, rotationDuration * 1000);
      }
    }

    ancestorRef.current?.addEventListener('mousemove', (e) =>
      handleMouseMove(e, { circleX, circleY, pointsQuantity }),
    );
    ancestorRef.current?.addEventListener('click', () =>
      handleClick(handleMouseMove as (e: MouseEvent) => void),
    );

    return () => {
      ancestorRef.current?.removeEventListener('mousemove', (e) =>
        handleMouseMove(e, { circleX, circleY, pointsQuantity }),
      );
      ancestorRef.current?.removeEventListener('click', () =>
        handleClick(handleMouseMove as (e: MouseEvent) => void),
      );
    };
  }, []);

  return (
    <>
      <div className="time-intervals" ref={ancestorRef}>
        <div className="time-intervals__interval">
          <span className="interval__start-year">2015</span>
          &nbsp;&nbsp;
          <span className="interval__final-year">2022</span>
        </div>
        <div className="time-intervals__point point1" ref={prevPointRef}>
          <span className="point-number" ref={prevPointNumberRef}>
            1
          </span>
          <span className="point-label">Литература</span>
        </div>
        <div className="time-intervals__point point2">
          <span className="point-number">2</span>
          <span className="point-label">Литература</span>
        </div>
        <div className="time-intervals__point point3">
          <span className="point-number">3</span>
          <span className="point-label">Литература</span>
        </div>
        <div className="time-intervals__point point4">
          <span className="point-number">4</span>
          <span className="point-label">Литература</span>
        </div>
        <div className="time-intervals__point point5">
          <span className="point-number">5</span>
          <span className="point-label">Литература</span>
        </div>
        <div className="time-intervals__point point6">
          <span className="point-number">6</span>
          <span className="point-label">Литература</span>
        </div>
      </div>
    </>
  );
}

export default TimeIntervals;
