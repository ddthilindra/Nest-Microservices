// ALL OTHER SCHEMA IN MICRO SERVICE WILL EXTEND FROM THIS

import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class AbstractDocument {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;
}