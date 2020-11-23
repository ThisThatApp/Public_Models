import { Poll } from "./poll.entity";
import { Collection } from "./collection.entity";
import { Profile } from "./profile.entity";
export declare class Tracking {
    tracking_id: string;
    tracker: Profile;
    poll?: Poll;
    collection?: Collection;
    sharing_profile: Profile;
    created_at?: Date;
}
