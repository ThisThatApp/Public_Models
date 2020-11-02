import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany, Check, Index } from "typeorm";
import { User } from "./user.entity";
import { CATEGORIES } from "../shared/enums/categories.enum";
import { Profile } from "./profile.entity";
import { Option } from "./option.entity";
import { Collection } from "./collection.entity";
import { Pair } from "./pair.entity";
import { Genders } from "../shared/enums/genders.enum";
import { Educations } from "../shared/enums/educations.enum";
import { IGeoPoint } from "../shared/interfaces/geo_point.interface";

@Entity("polls")
@Check("check_null_profile_id_or_collection", `(profile_id is not null and collection_id is null) or (profile_id is null and collection_id is not null)`)
@Check("check_poll_finalized", `is_draft is null or (is_draft and finalized_at is null) or (not is_draft and finalized_at is not null)`)
@Check("check_poll_responses_count", `responses_count <= desired_responses_count and responses_count > 0`)
@Check("check_poll_complete_responses_count", `complete_responses_count <=  responses_count and complete_responses_count > 0`)
export class Poll {
  @PrimaryColumn()
  poll_id: string;

  @Column({
    nullable: false,
  })
  question: string;

  @Column({
    nullable: true,
  })
  thumbnail_url: string;

  @Column({
    nullable: true,
  })
  caption?: string;

  @Column({
    nullable: true,
  })
  language?: string;

  @Column({
    type: "point",
    nullable: true,
  })
  geo_point?: IGeoPoint | string;

  @Column({
    nullable: true,
  })
  location?: string;

  @Column({
    type: "enum",
    enum: CATEGORIES,
    nullable: true,
  })
  category?: CATEGORIES;

  @Column({
    nullable: true,
  })
  visibile_options_count?: number;

  @Column({
    nullable: true,
  })
  desired_responses_count?: number;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  release_date?: Date;

  @Column({
    type: "jsonb",
    array: false,
    nullable: true,
  })
  audience_age_groups?: Array<{ start: number; end: number }>;

  @Column({
    nullable: true,
  })
  @Column("varchar", {
    array: true,
    nullable: true,
  })
  audience_genders?: Genders[];

  @Column("varchar", {
    array: true,
    nullable: true,
  })
  audience_educations?: Educations[];

  @Column("varchar", {
    array: true,
    nullable: true,
  })
  audience_locations?: string[];

  @Column({
    default: false,
    nullable: false,
  })
  is_analytics_poll?: boolean;

  @Column({
    nullable: true,
  })
  has_anonymous_vote?: boolean;

  @Column({
    nullable: true,
  })
  is_private?: boolean;

  @Column({
    nullable: true,
  })
  is_familiarity_required?: boolean;

  @Column({
    nullable: true,
  })
  is_draft?: boolean;

  @Column({
    default: false,
  })
  is_hidden?: boolean;

  @Column({
    nullable: true,
  })
  is_active?: boolean;

  @Column({
    default: 0,
  })
  votes_count: number;

  @Column({
    default: 0,
  })
  responses_count: number;

  @Column({
    default: 0,
  })
  complete_responses_count: number;

  @ManyToOne(() => User, (user) => user.polls, { nullable: false })
  @JoinColumn({
    name: "creator_id",
  })
  creator: User;

  @ManyToOne(() => Profile, (profile) => profile.polls, { nullable: true })
  @JoinColumn({
    name: "profile_id",
  })
  profile?: Profile;

  @Index("collection-id-idx")
  @ManyToOne(() => Collection, (collection) => collection.polls, {
    nullable: true,
  })
  @JoinColumn({
    name: "collection_id",
  })
  collection?: Collection;

  @OneToMany(() => Option, (option) => option.poll)
  options?: Option[];

  @OneToMany(() => Pair, (pair) => pair.poll)
  pairs?: Pair[];

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at?: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  finalized_at?: Date;
}
