import './action-panel.css'
import '../components/button.css'
import {useLibraryApi} from "../hooks/useLibraryApi";
import {useNavigate} from "react-router-dom";

export const ActionPanel = ({obj, resource, refetch}) => {

  const {remove} = useLibraryApi(resource);

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await remove(obj.id);
      refetch();
    } catch (error) {
      console.error('Ошибка при удалении', error);
    }
  };

  return (
      <div className="action-panel">
        <button className={"button update-button"}
                onClick={() => navigate(`/${resource}/edit/${obj.id}`)}>
          <img src="/icons/refresh.png" alt="Update"/>
        </button>
        <button className="button delete-button" onClick={handleDelete}>
          <img src="/icons/delete.png" alt="Delete"/>
        </button>
      </div>
  );
};