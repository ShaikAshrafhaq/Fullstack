import './PageHeader.css';

const PageHeader = ({ title, onBack }) => {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {onBack && (
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
      )}
    </div>
  );
};

export default PageHeader; 