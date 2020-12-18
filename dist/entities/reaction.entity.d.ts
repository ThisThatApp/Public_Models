import { Profile } from "./profile.entity";
import { Reactions } from "../shared/enums/reactions.enum";
import { Survey } from "./survey.entity";
export declare class Reaction {
    reaction_id: string;
    profile: Profile;
    survey?: Survey;
    reaction: Reactions;
    sharing_profile: Profile;
    created_at?: Date;
}
