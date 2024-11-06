import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface CountdownTimerProps {
  targetDate: Date;
  startDate: Date;
  size?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  startDate,
  size,
}) => {
  const width = size || 50;
  const textStyles = { fontSize: `${width / 3.5}px`, fontWeight: "bold" };
  const numberStyles = { fontSize: `${width / 3}px`, fontWeight: "bold" };
  const colors = "var(--ifm-color-primary)";

  const totalDuration = Math.floor(
    (targetDate.getTime() - startDate.getTime()) / 1000,
  );
  const now = new Date();
  const elapsedDuration = Math.floor(
    (now.getTime() - startDate.getTime()) / 1000,
  );
  const remainingDuration = Math.max(totalDuration - elapsedDuration, 0);

  const calculateInitialRemainingTime = (unitDuration: number) => {
    if (remainingDuration === 0) return 0;
    return remainingDuration % unitDuration;
  };

  const handleComplete = () => {
    return { shouldRepeat: remainingDuration > 0 };
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CountdownCircleTimer
          isPlaying
          duration={totalDuration}
          initialRemainingTime={remainingDuration}
          colors={colors as any}
          size={width}
          strokeWidth={width / 10}
        >
          {({ remainingTime }) => (
            <div>
              <div style={numberStyles}>
                {Math.floor(remainingTime / (24 * 60 * 60))}
              </div>
            </div>
          )}
        </CountdownCircleTimer>
        <div style={textStyles}>Days</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CountdownCircleTimer
          isPlaying
          duration={24 * 60 * 60}
          initialRemainingTime={calculateInitialRemainingTime(24 * 60 * 60)}
          colors={colors as any}
          size={width}
          strokeWidth={width / 10}
          onComplete={handleComplete}
        >
          {({ remainingTime }) => (
            <div>
              <div style={numberStyles}>
                {Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60))}
              </div>
            </div>
          )}
        </CountdownCircleTimer>
        <div style={textStyles}>Hours</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CountdownCircleTimer
          isPlaying
          duration={60 * 60}
          initialRemainingTime={calculateInitialRemainingTime(60 * 60)}
          colors={colors as any}
          size={width}
          strokeWidth={width / 10}
          onComplete={handleComplete}
        >
          {({ remainingTime }) => (
            <div>
              <div style={numberStyles}>
                {Math.floor((remainingTime % (60 * 60)) / 60)}
              </div>
            </div>
          )}
        </CountdownCircleTimer>
        <div style={textStyles}>Minutes</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <>
          <CountdownCircleTimer
            isPlaying
            duration={60}
            initialRemainingTime={calculateInitialRemainingTime(60)}
            colors={colors as any}
            size={width}
            strokeWidth={width / 10}
            onComplete={handleComplete}
          >
            {({ remainingTime }) => (
              <div>
                <div style={numberStyles}>{remainingTime % 60}</div>
              </div>
            )}
          </CountdownCircleTimer>
          <div style={textStyles}>Seconds</div>
        </>
      </div>
    </div>
  );
};

export default CountdownTimer;
