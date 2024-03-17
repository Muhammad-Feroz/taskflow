import { Children, Fragment, cloneElement, isValidElement, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({ open, setOpen, children }: { open: boolean, setOpen: (state: boolean) => void, children: any }) {
  const cancelButtonRef = useRef(null)

  useEffect(() => {
    const rootDiv = document.getElementById('root');
  
    if (open && rootDiv) {
      const observer = new MutationObserver(() => {
        rootDiv.removeAttribute('aria-hidden');
        rootDiv.removeAttribute('inert');
      });
  
      observer.observe(rootDiv, { attributes: true });
  
      return () => observer.disconnect();
    }
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ml-[288px]" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto" style={{ width: "calc(100vw - 288px)", marginLeft: 'auto' }}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {/* pass props to children */}
                {Children.map(children, child => {
                  if (isValidElement(child)) {
                    return cloneElement(child, { setOpen, cancelButtonRef } as { setOpen: (state: boolean) => void, cancelButtonRef: React.RefObject<unknown> });
                  }
                  return child;
                })}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
