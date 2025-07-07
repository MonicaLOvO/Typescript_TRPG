"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapToEntity = MapToEntity;
exports.MapToDto = MapToDto;
function MapToEntity(dto) {
    var _a, _b, _c, _d;
    return {
        id: (_a = dto.id) !== null && _a !== void 0 ? _a : "",
        username: (_b = dto.username) !== null && _b !== void 0 ? _b : "",
        email: (_c = dto.email) !== null && _c !== void 0 ? _c : "",
        password: (_d = dto.password) !== null && _d !== void 0 ? _d : ""
    };
}
function MapToDto(entity) {
    var _a, _b, _c;
    return {
        id: entity.id,
        username: (_a = entity.username) !== null && _a !== void 0 ? _a : "",
        email: (_b = entity.email) !== null && _b !== void 0 ? _b : "",
        password: (_c = entity.password) !== null && _c !== void 0 ? _c : ""
    };
}
