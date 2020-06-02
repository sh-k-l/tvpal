import React from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alerts';

const Alert = ({ alerts, removeAlertById }) => {
  return (
    <div className="alert-wrapper">
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <p>{alert.msg}</p>
            <i className="fas fa-times" onClick={() => removeAlertById(alert.id)}></i>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

const mapDispatchToProps = (dispatch) => ({
  removeAlertById: (id) => dispatch(removeAlert(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
