const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  leadSource: { type: String, enum: ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event'], required: true },
  assignedSalesperson: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'], default: 'New' },
  dealValue: { type: Number, default: 0 },
  priority: { type: String, enum: ['Hot', 'Warm', 'Cold'], default: 'Cold' },
  nextFollowUpDate: { type: Date }
}, { timestamps: true });

leadSchema.statics.computePriority = function (dealValue, updatedAt) {
  const now = new Date();
  const updatedDate = updatedAt ? new Date(updatedAt) : now;
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

  if (dealValue > 10000 || updatedDate >= twoDaysAgo) {
    return 'Hot';
  }

  if (dealValue >= 3000 && dealValue <= 10000) {
    return 'Warm';
  }

  return 'Cold';
};

leadSchema.pre('save', function (next) {
  this.priority = this.constructor.computePriority(this.dealValue, this.updatedAt || this.createdAt);
  next();
});

leadSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (!update) return next();

  const dealValue = update.dealValue !== undefined ? update.dealValue : this._conditions.dealValue;
  const updatedAt = update.updatedAt || new Date();

  if (dealValue !== undefined) {
    update.priority = this.model.computePriority(dealValue, updatedAt);
  } else if (update.$set && update.$set.dealValue !== undefined) {
    update.$set.priority = this.model.computePriority(update.$set.dealValue, updatedAt);
  } else if (!update.priority) {
    // Recalculate priority when status or follow-up changes if dealValue stays the same
    this.model.findOne(this._conditions).then((doc) => {
      if (doc) {
        update.priority = this.model.computePriority(doc.dealValue, updatedAt);
      }
      next();
    }).catch(next);
    return;
  }

  next();
});

module.exports = mongoose.model('Lead', leadSchema);