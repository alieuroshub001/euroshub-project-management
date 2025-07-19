// src/models/hr/Employee.model.ts

import { Schema, model, Document } from 'mongoose';
import { Role, Status } from '../../types/common';

export interface IEmployee extends Document {
  userId: Schema.Types.ObjectId;
  employeeId: string;
  department: string;
  position: string;
  hireDate: Date;
  terminationDate?: Date;
  salary?: number;
  managerId?: Schema.Types.ObjectId;
  directReports?: Schema.Types.ObjectId[];
  status: Status;
}

const employeeSchema = new Schema<IEmployee>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      unique: true 
    },
    employeeId: { 
      type: String, 
      required: true,
      unique: true,
      trim: true 
    },
    department: { 
      type: String, 
      required: true,
      trim: true 
    },
    position: { 
      type: String, 
      required: true,
      trim: true 
    },
    hireDate: { 
      type: Date, 
      required: true 
    },
    terminationDate: { type: Date },
    salary: { 
      type: Number, 
      min: 0 
    },
    managerId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Employee' 
    },
    directReports: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Employee' 
    }],
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending', 'archived'],
      default: 'active'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
employeeSchema.index({ employeeId: 1 }, { unique: true });
employeeSchema.index({ department: 1 });
employeeSchema.index({ position: 1 });
employeeSchema.index({ managerId: 1 });
employeeSchema.index({ status: 1 });

export const Employee = model<IEmployee>('Employee', employeeSchema);