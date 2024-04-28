import { IService } from '.';

interface IProps {
  callbackExit: () => void;
  serviceData?: IService;
}

const UpdateServiceModal = (props: IProps) => {
  console.log(props);
  return <div>UpdateServiceModal</div>;
};

export default UpdateServiceModal;
