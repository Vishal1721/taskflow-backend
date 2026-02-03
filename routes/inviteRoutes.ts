import acceptInvite from "../controllers/inviteContoller";
import router from "./userRoutes";

router.post("/accept", acceptInvite);
export default router;