import { Entity, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import { User } from "./user.entity";
import { Option } from "./option.entity";
import { OptionVoteActions } from "../shared/enums/actions.enum";
import { Profile } from "./profile.entity";
import { TrackableLink } from "./trackable_link.entity";

@Entity("option_votes_history")
export class OptionVoteHistory {
  @PrimaryGeneratedColumn("uuid")
  option_vote_history_id: string;

  @Index()
  @ManyToOne(() => Option, { nullable: false })
  @JoinColumn({
    name: "option_id",
  })
  option: Option;

  @Column({
    type: "enum",
    enum: OptionVoteActions,
    enumName: "option_vote_action_enum",
    nullable: false,
  })
  action: OptionVoteActions;

  @Index()
  @ManyToOne(() => Profile, { nullable: false })
  @JoinColumn({
    name: "voter_id",
  })
  voter: Profile;

  @ManyToOne(() => Profile, { nullable: true })
  @JoinColumn({
    name: "sharing_profile_id",
  })
  sharing_profile: Profile;

  @ManyToOne(() => TrackableLink, { nullable: true })
  @JoinColumn({
    name: "trackable_link_id",
  })
  trackable_link: TrackableLink;


  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at?: Date;
}
