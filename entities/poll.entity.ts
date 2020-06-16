import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { CATEGORIES } from '../shared/enums/categories.enum';
import { Profile } from './profile.entity';

@Entity('polls')
export class Poll {
    @PrimaryColumn()
    poll_id: string;

    @Column()
    question: string;

    @Column({
        nullable: true
    })
    caption?: string;

    @Column({
        nullable: true
    })
    language?: string;

    @Column({
        type: 'point',
        nullable: true
    })
    geo_point?: string;
    
    @Column({
        nullable: true
    })
    location?: string;

    @Column({
        type: 'enum',
        enum: CATEGORIES,
        nullable: false
    })
    category: CATEGORIES;

    @Column({
        default: 0,
    })
    visibile_options_count?: number;

    @Column({
        default: 0,
    })
    analytics_audience_size?: number;

    @Column({
        type: 'timestamptz',
        nullable: true
    })
    release_date?: Date;

    @Column({
        default: false
    })
    is_analytics_poll?: boolean;

    @Column({
        nullable: true
    })
    is_private?: boolean;

    @Column({
        nullable: true
    })
    is_familiarity_required?: boolean;

    @Column({
        default: false
    })
    is_draft?: boolean;

    @Column({
        default: false
    })
    is_hidden?: boolean;


    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({
        name: 'creator_id'
    })
    creator: User;
    
    @ManyToOne(() => Profile, { nullable: true })
    @JoinColumn({
        name: 'profile_id'
    })
    profile?: Profile;

    @Column({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at?: Date;
}