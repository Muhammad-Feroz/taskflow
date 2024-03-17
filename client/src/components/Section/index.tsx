import Button from "../Button";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  title: string;
  description?: string;
  btnTitle?: string;
  btnOnClick?: () => void;
  isBackBtn?: boolean;
}

export default function Section({ title, description, btnTitle, btnOnClick, isBackBtn }: SectionProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <div className="flex items-center mb-2">
            { isBackBtn && <ArrowUturnLeftIcon className="h-6 w-6 text-indigo-600 mr-2 cursor-pointer" onClick={() => handleBack()} /> }
            <h1 className="text-4xl font-semibold">{title}</h1>
          </div>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
        <div>
          {
            btnTitle && btnOnClick && <Button onClick={btnOnClick}>{btnTitle}</Button>
          }
        </div>
      </div>
    </>
  )
}