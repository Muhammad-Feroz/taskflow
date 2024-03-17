import { Dialog } from "@headlessui/react";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

interface ModalBodyProps {
  title?: string;
  description?: string;
  showCancelBtn?: boolean;
  button?: ButtonProps;
  setOpen?: (state: boolean) => void;
  cancelButtonRef?: React.RefObject<unknown>;
  icon?: React.ElementType;
}

export default function ModalBody(props:ModalBodyProps) {
  const { title, description, button, showCancelBtn, setOpen, cancelButtonRef } = props;
  return (
    <>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          { props.icon && <props.icon className="h-6 w-6 text-green-600" aria-hidden="true" /> }
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          onClick={() => button?.onClick()}
        >
          {button?.title}
        </button>
        {
          showCancelBtn && (
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            onClick={() => setOpen?.(false)}
            ref={cancelButtonRef as React.RefObject<HTMLButtonElement>}
          >
            Cancel
          </button>
          )
        }
      </div>
    </>
  )
}

ModalBody.defaultProps = {
  title: "Are you sure?",
  description: "This action cannot be undone.",
  showCancelBtn: true,
  button: {
    title: "Delete",
    onClick: () => {}
  }
}