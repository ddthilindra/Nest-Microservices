// MICROSERVICES CAN EXTEND THIS COMMON CRUD FUNCTIONALITY WITHOUT REPEAT ANY CODE

import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.scema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument>{
    protected abstract readonly logger: Logger;

    constructor(protected readonly model: Model<TDocument>) { }

    // CREATE
    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return ((await createdDocument.save()).toJSON() as unknown as TDocument)
    }

    // FIND ONE
    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });

        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new NotFoundException('Document not found.');
        }
        return document;
    }

    // FIND ONE AND UPDATE
    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true, new: true
        })
        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new NotFoundException('Document not found.');
        }
        return document;
    }

    // FIND
    async find(filterQuery: FilterQuery<TDocument>) {
        return this.model.find(filterQuery, {}, { lean: true })
    }

    // FIND ONE AND DELETE
    async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
        return this.model.findOneAndDelete(filterQuery, { lean: true })
    }
}