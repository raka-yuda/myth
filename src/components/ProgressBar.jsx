const ProgressBar = ({height = "h-1", progress = 0}) => {
  return (
    <div className={`mb-6 ${height} w-full bg-gray-100 `}>
      <div data-testid="progress-bar" className={`${height} bg-gray-400`} style={{ width: `${progress.toString()}%` }}></div>
    </div>
  );
};

export default ProgressBar;