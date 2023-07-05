import React, { useEffect, useRef } from 'react';
import { ArrowControlsStatus } from '@/components/historicalDates/ArrowControls';
import getActualPointIndex from '@/utils/timeIntervals/getActualPointIndex';
import getNearestPointIndex from '@/utils/timeIntervals/getNearestPointIndex';
import changePointZPosition from '@/utils/timeIntervals/gsap/changePointZPosition';
import hidePoint from '@/utils/timeIntervals/gsap/hidePoint';
import rotatePoints from '@/utils/timeIntervals/gsap/rotatePoints';
import showPoint from '@/utils/timeIntervals/gsap/showPoint';
import showPointLabel from '@/utils/timeIntervals/gsap/showPointLabel';
import matrixToDegrees from '@/utils/timeIntervals/matrixToDegrees';
import Point from './Point';
import YearsInterval from './YearsInterval';

interface PointData {
  id: string;
  index: number;
  label: string;
}

interface TimeIntervalsProps {
  currentPointIndex: number;
  startYear: number;
  lastYear: number;
  pointsData: PointData[];
  rotationDuration: number;
  bulletClickHandler: (id: number) => void;
  arrowControlsStatus: ArrowControlsStatus;
  arrowControlsStatusSetter: (status: ArrowControlsStatus) => void;
}

function TimeIntervals({
  currentPointIndex,
  arrowControlsStatus,
  startYear,
  lastYear,
  pointsData,
  rotationDuration,
  bulletClickHandler: handleBulletClick,
  arrowControlsStatusSetter: setArrowControlsStatus,
}: TimeIntervalsProps) {
  // инициализируем рефы для основных элементов
  const ancestorRef = useRef<HTMLDivElement | null>(null);
  const activePointNumberRef = useRef<HTMLSpanElement | null>(null);
  const activePointRef = useRef<HTMLDivElement | null>(null);
  const prevPointNumberRef = useRef<HTMLSpanElement | null>(null);
  const prevPointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // записываем первый пойнт и его номер в рефы
    prevPointRef.current = ancestorRef.current?.querySelector(
      '.time-intervals__point',
    ) as HTMLDivElement;
    prevPointNumberRef.current =
      prevPointRef.current?.querySelector('.point-number');

    // показываем первый пойнт при первой загрузке компонента
    showPoint({
      point: prevPointRef.current as HTMLDivElement,
      pointNumber: prevPointNumberRef.current as HTMLSpanElement,
      animate: false,
    });
    showPointLabel({
      label: prevPointRef.current?.querySelector(
        '.point-label',
      ) as HTMLSpanElement,
      animate: false,
    });

    //задаём количество пойнтов
    const pointsQuantity = pointsData.length;

    // находим центр окружности
    const circle = ancestorRef.current as HTMLSpanElement;
    let circleCoords = circle?.getBoundingClientRect();
    let circleRadius = circleCoords.width / 2;
    let circleX = circleCoords.x + circleRadius + window.scrollX;
    let circleY = circleCoords.y + circleRadius + window.scrollY;

    // корректируем координаты центра окружности при изменении экрана
    function handleWindowResize() {
      circleCoords = circle?.getBoundingClientRect();
      circleRadius = circleCoords.width / 2;
      circleX = circleCoords.x + circleRadius + window.scrollX;
      circleY = circleCoords.y + circleRadius + window.scrollY;
    }

    function handleMouseMove(e: MouseEvent) {
      const currentElement = e.target as HTMLSpanElement;

      const isPointNumber = currentElement.classList.contains('point-number');

      // если найден номер пойнта и он не является последним выбранным или активным, то показываем его и записываем
      if (isPointNumber) {
        if (
          currentElement !== prevPointNumberRef.current &&
          currentElement !== activePointNumberRef.current
        ) {
          activePointNumberRef.current = currentElement as HTMLSpanElement;
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
      const nearestPointIndex = getNearestPointIndex({
        ax: circleX,
        ay: circleY,
        bx: e.pageX,
        by: e.pageY,
      });

      const actualNearestPointIndex = getActualPointIndex({
        index: nearestPointIndex,
        pointsQuantity: pointsQuantity,
        firstPointNumber: Number(prevPointNumberRef.current?.innerText),
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

    function handleClick() {
      if (
        activePointNumberRef.current !== null &&
        activePointRef.current !== null
      ) {
        const chosenPosition = matrixToDegrees(
          window.getComputedStyle(activePointRef.current).transform,
        );
        const points = ancestorRef.current?.querySelectorAll(
          '.time-intervals__point',
        ) as NodeListOf<Element>;

        rotatePoints({
          chosenPosition: chosenPosition,
          activePointNumber: activePointNumberRef.current,
          prevPoint: prevPointRef.current as HTMLDivElement,
          prevPointNumber: prevPointNumberRef.current as HTMLSpanElement,
          points: points,
          pointsQuantity: points.length,
          duration: rotationDuration,
        });

        prevPointNumberRef.current = activePointNumberRef.current;
        prevPointRef.current = activePointRef.current;
        activePointRef.current = null;
        activePointNumberRef.current = null;

        setTimeout(() => {
          const pointLabel = prevPointRef.current?.querySelector(
            '.point-label',
          ) as HTMLSpanElement;

          showPointLabel({
            label: pointLabel,
          });
        }, rotationDuration * 1000);
      }
    }

    ancestorRef.current?.addEventListener('mousemove', (e) =>
      handleMouseMove(e),
    );
    ancestorRef.current?.addEventListener('click', handleClick);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      ancestorRef.current?.removeEventListener('mousemove', handleMouseMove);
      ancestorRef.current?.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (arrowControlsStatus !== null) {
      activePointRef.current = ancestorRef.current?.querySelector(
        `.point${currentPointIndex}`,
      ) as HTMLDivElement;

      activePointNumberRef.current =
        activePointRef.current?.querySelector('.point-number');

      showPoint({
        point: activePointRef.current as HTMLDivElement,
        pointNumber: activePointNumberRef.current as HTMLSpanElement,
      });
      activePointNumberRef.current?.click();

      setTimeout(() => {
        setArrowControlsStatus(null);
      }, rotationDuration * 1000 + 300);
    }
  }, [arrowControlsStatus]);

  return (
    <>
      <div className="time-intervals" ref={ancestorRef}>
        <YearsInterval startYear={startYear} lastYear={lastYear} />
        {pointsData.map(({ id, index, label }) => (
          <Point
            key={id}
            index={index}
            label={label}
            bulletClickHandler={() => handleBulletClick(index)}
          />
        ))}
      </div>
    </>
  );
}

export default TimeIntervals;
