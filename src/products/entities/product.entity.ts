import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from './product-image.entity';
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'products'
})
export class Product {

    @ApiProperty({
        example: '62756d91-5c9c-423d-a094-1cd5c1eab2f0',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({
        example: 'Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string;


    @ApiProperty({
        example: 0,
    })
    @Column('float', {
        default: 0
    })
    price: number;


    @ApiProperty({
        example: 'Anim sjnjfgd oifd dfiuhnui iuhbudfgbn',
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    
    @ApiProperty({
        example: 'teslo_slug',
        description: 'Product SLUG for seo',
        uniqueItems: true
    })
    @Column({
        type: 'text',
        unique: true,
    })
    slug: string;


    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default:0
    })
    @Column('int', {
        default: 0
    })
    stock: number;


    @ApiProperty({
        example: ['M', 'XL'],
        description: 'Product sizes',
    })
    @Column('text', {
        array: true
    })
    sizes: string[];


    @ApiProperty({
        example: 'women',
        description: 'Product gender',
    })
    @Column('text')
    gender: string;


    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];


    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[]

    
    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user: User


    @BeforeInsert()
    checkSlugInsert()
    {
        if(!this.slug)
        {
            this.slug = this.title
        }

        this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'", '')
    }


    @BeforeUpdate()
    checkSlugUpdate()
    {
        this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'", '')
    }

}
