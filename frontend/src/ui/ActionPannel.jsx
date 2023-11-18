import '../styles/action-panel.css'
import '../styles/button.css'
import {libraryApi} from "../api/libraryApi";
import {useNavigate} from "react-router-dom";

export const ActionPanel = ({obj, resource, refetch}) => {

  const {remove} = libraryApi(resource);

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    await remove(obj.id);
    refetch();
  };

  const handleEdit = () => {
    if (resource === 'comment') {
      navigate(`/book/${obj.bookId}/comment/edit/${obj.id}`)
    } else {
      navigate(`/${resource}/edit/${obj.id}`)
    }
  }

  return (
      <div className="action-panel">
        <button className={"button update-button"} onClick={handleEdit}>
          <img src="/icons/edit.png" alt="edit"/>
        </button>
        <button className="button delete-button" onClick={handleDelete}>
          <img src="/icons/delete.png" alt="Delete"/>
        </button>
      </div>
  );
};