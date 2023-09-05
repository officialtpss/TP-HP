const { Op } = require('sequelize');
const AllModels = require('../../services/model.service');

const isAdmin = async (req, res, next) => {
    if (res.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorize to do this action!' });
    }
    next();
};
const isAgencyAdmin = async (req, res, next) => {
    if (res.role !== 'agency') {
        return res.status(403).json({ msg: 'Not authorize to do this action!' });
    }
    next();
};
const isProjectAdmin = async (req, res, next) => {
    if (res.role !== 'project_admin') {
        return res.status(403).json({ msg: 'Not authorize to do this action!' });
    }
    next();
};
const isProjectOrAgencyAdmin = async (req, res, next) => {
    if (res.role === 'admin') {
        return res.status(403).json({ msg: 'Not authorize to do this action!' });
    }
    next();
};

const validateRole = (...roles) => {
    return (req, res, next) => {
        if (roles.length && !roles.includes(res.role)) {
            return res.status(401).json({ msg: 'Not authorize to do this action!' });
        }
        next();
    }
}

const isAuthorized = async (req, res, next) => {
    const { Project } = AllModels();
    try {
        const id = req.params.project_id || req.body.project_id || req.params.id;
        const ProjectData = await Project.findOne({ where: { id, status: { [Op.ne]: 'deleted' } } });
        if (!ProjectData) return res.status(400).json({ msg: 'Project  not found' });
        const authUser = res.userId === ProjectData.project_admin_id || ProjectData.all_access === 'yes'
        if (!authUser) return res.status(403).json({ msg: 'You are not authorized to update this project' })
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = {
    isAdmin,
    isAgencyAdmin,
    isProjectAdmin,
    isProjectOrAgencyAdmin,
    isAuthorized,
    validateRole
}