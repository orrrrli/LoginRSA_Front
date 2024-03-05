import PropTypes from 'prop-types';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const CreateUserModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create User Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-4">Create Account</h2>
        {/* Input fields and buttons */}
      </div>
    </Modal>
  );
};

CreateUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default CreateUserModal;
