"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async insert(data) {
        return await this.model.create(data);
    }
    async findAll() {
        return await this.model.find().where({ deletedAt: null });
    }
    async findOneBy(query) {
        return await this.model.findOne({ ...query, deletedAt: null });
    }
    async findById(id) {
        return await this.model.findById(id).where({ deletedAt: null });
    }
    async findByIds(ids) {
        return await this.model.find().where({
            _id: {
                $in: ids,
            },
            deletedAt: null,
        });
    }
    async findBy(query) {
        return await this.model.find({ ...query, deletedAt: null });
    }
    async patchById(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }
    async updateMany(ids, requestData) {
        return await this.model.updateMany({});
    }
    async deleteById(id) {
        return await this.patchById(id, { deletedAt: new Date() });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map