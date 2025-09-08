import { useDispatch } from "react-redux/alternate-renderers";
import EditUserForm from "../components/forms/EditUserForm.tsx";
import { useUser } from "../hooks/required-user.ts";
import { selectUserByAccount, userUpdated } from "../main/reducers/users.ts";
import {
    useNavigate,
    useParams,
} from "react-router/internal/react-server-client";
import { useAppSelector } from "../hooks/redux.ts";

function EditUsre() {
    const { userId } = useParams();
    const user = useUser();
    const dispatch = useDispatch();
    const otherUser = useAppSelector((state) =>
        selectUserByAccount(state.users, userId!)
    );
    const navigate = useNavigate();

    return (
        <EditUserForm
            initialValues={user.isAdmin ? otherUser! : user}
            onSubmit={(values) => {
                dispatch(
                    userUpdated({
                        identity: {
                            aadhaar: user.isAdmin
                                ? otherUser!.aadhaar
                                : user.aadhaar,
                        },
                        updates: values,
                    }),
                );
                if (user.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            }}
        />
    );
}

export default EditUsre;
