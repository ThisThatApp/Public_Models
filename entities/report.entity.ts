import { Entity, Column, JoinColumn, ManyToOne, Check, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Profile } from "./profile.entity";
import { Comment } from "./comment.entity";
import { Survey } from "./survey.entity";

@Entity("reports")
@Check("check_comment_or_survey_or_profile_report", `comment_id is not null or survey_id is not null or profile_id is not null`)
@Unique("unique_reporter_comment", ["reporter", "comment"])
@Unique("unique_reporter_survey", ["reporter", "survey"])
@Unique("unique_reporter_profile", ["reporter", "profile"])
export class Report {
  @PrimaryGeneratedColumn("uuid")
  report_id: string;

  @ManyToOne(() => Profile, { nullable: false })
  @JoinColumn({
    name: "reporter_id",
  })
  reporter: Profile;

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({
    name: "comment_id",
  })
  comment?: Comment;

  @ManyToOne(() => Survey, { nullable: true })
  @JoinColumn({
    name: "survey_id",
  })
  survey?: Survey;

  @ManyToOne(() => Profile, { nullable: true })
  @JoinColumn({
    name: "profile_id",
  })
  profile?: Profile;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at?: Date;
}
