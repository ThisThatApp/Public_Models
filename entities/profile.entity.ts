import { Entity, Column, PrimaryColumn, Index, JoinColumn, ManyToOne, OneToOne, OneToMany, Unique, Check } from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";
import { Poll } from "./poll.entity";
import { NOTIFICATION_PREFERENCES } from "../shared/enums/notification_preferences.enum";
import { IGeoPoint } from "../shared/interfaces/geo_point.interface";

@Entity("profiles")
@Check("check_anlaytics_profile_join_link", `not is_analytics_profile or join_link is not null`)
export class Profile {
  @PrimaryColumn()
  profile_id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @Index()
  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @Index()
  @Column({
    nullable: true,
  })
  fullname?: string;

  @Column({
    default: 0,
  })
  activity_badge?: number;

  @Column({
    default: false,
  })
  is_verified?: boolean;

  @Column({
    default: true,
  })
  is_active?: boolean;

  @Column({
    default: false,
  })
  is_hidden?: boolean;

  @Column({
    default: false,
  })
  profile_completed?: boolean;

  @Column({
    nullable: true,
  })
  bio?: string;

  @Column({
    type: "point",
    nullable: true,
  })
  geo_point?: IGeoPoint | string;

  @Column({
    nullable: true,
  })
  location?: string;

  @Column("varchar", {
    array: true,
    default: "{}",
  })
  notifications_preferences?: NOTIFICATION_PREFERENCES[];

  @Column({
    default: false,
  })
  neighborhood_visible?: boolean;

  @Column({
    default: false,
  })
  is_analytics_profile?: boolean;

  @Column({
    nullable: true,
  })
  image_url?: string;

  @Column({
    nullable: true,
  })
  fcm_token?: string;

  @Column("varchar", {
    array: true,
    default: "{}",
  })
  sees_polls_from?: string[];

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  last_opened_app?: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  last_checked_activity?: Date;

  @Index()
  @Column({
    unique: true,
    nullable: true,
  })
  join_link?: string;

  @Column({
    default: false,
  })
  is_private?: boolean;

  @ManyToOne(() => Team, (team) => team.profiles, { nullable: true })
  @JoinColumn({
    name: "team_id",
  })
  team: Team;

  @OneToMany(() => Poll, (poll) => poll.profile)
  polls?: Poll[];

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at?: Date;
}
