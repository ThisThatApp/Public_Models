import { User } from "./user.entity";
import { CATEGORIES } from "../shared/enums/categories.enum";
import { Profile } from "./profile.entity";
import { Option } from "./option.entity";
import { Collection } from "./collection.entity";
import { Pair } from "./pair.entity";
import { IGeoPoint } from "../shared/interfaces/geo_point.interface";
export declare class Poll {
    poll_id: string;
    question: string;
    thumbnail_url: string;
    caption?: string;
    language?: string;
    geo_point?: IGeoPoint | string;
    location?: string;
    category?: CATEGORIES;
    visible_options_count?: number;
    desired_responses_count?: number;
    release_date?: Date;
    is_analytics_poll?: boolean;
    is_private?: boolean;
    is_familiarity_required?: boolean;
    is_draft?: boolean;
    is_hidden?: boolean;
    is_active?: boolean;
    ready_to_post?: boolean;
    position: number;
    votes_count: number;
    responses_count: number;
    comments_count: number;
    creator: User;
    profile?: Profile;
    collection?: Collection;
    options?: Option[];
    pairs?: Pair[];
    created_at?: Date;
    finalized_at?: Date;
    extra?: any;
}
