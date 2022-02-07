import { Modal, ModalBody } from "reactstrap";

const ConfirmModal = ({
  toggle,
  confirmFunction,
  confirmText,
  confirmBtnText,
  showModal,
  onClosed,
}) => {
  return (
    <Modal
      size="sm"
      onClosed={onClosed}
      isOpen={showModal}
      toggle={toggle}
      fade={false}
      id="confirm-modal"
      className="confirm-modal modal-fullscreen-md-down modal-lg"
      style={{ maxWidth: "500px" }}
    >
      <header className="modal-header w-100 bg-secondary px-md-3 d-flex justify-content-between align-items-center">
        <h3 className="text-capitalize h4 lh-base fw-bold text-light m-0">
          Confirm action!
        </h3>
        <button onClick={toggle} className="btn p-0">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.4" cx="20" cy="20" r="20" fill="white" />
            <circle cx="20.0002" cy="20" r="16" fill="white" />
            <g clipPath="url(#clip0)">
              <path
                d="M18.8275 20.0108L13.8434 15.0266C13.519 14.7024 13.519 14.1782 13.8434 13.854C14.1676 13.5298 14.6918 13.5298 15.016 13.854L20.0002 18.8382L24.9843 13.854C25.3086 13.5298 25.8327 13.5298 26.1569 13.854C26.4812 14.1782 26.4812 14.7024 26.1569 15.0266L21.1728 20.0108L26.1569 24.995C26.4812 25.3192 26.4812 25.8434 26.1569 26.1676C25.9953 26.3293 25.7829 26.4106 25.5706 26.4106C25.3583 26.4106 25.146 26.3293 24.9843 26.1676L20.0002 21.1834L15.016 26.1676C14.8543 26.3293 14.642 26.4106 14.4297 26.4106C14.2174 26.4106 14.0051 26.3293 13.8434 26.1676C13.519 25.8434 13.519 25.3192 13.8434 24.995L18.8275 20.0108Z"
                fill="#25282B"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="12.8"
                  height="12.8"
                  fill="white"
                  transform="matrix(-1 0 0 1 26.4001 13.5996)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </header>

      <ModalBody className="pb-0">
        <p className="text-center">{confirmText}</p>

        <div className="d-flex justify-content-center py-3">
          <button
            className="btn btn-outline-secondary me-2 me-md-3"
            onClick={toggle}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={confirmFunction}>
            {confirmBtnText}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmModal;
