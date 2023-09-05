const AllModels = require('../services/model.service');

const getUserInfoByToken = async (req, res, next) => {
  const { User } = AllModels();
  const userDetail = await User.findOne({ where: { id: res.userId } });
  if (!userDetail) {
    return res.status(401).json({ msg: 'No Authorization was found' });
  }
  res.userDetailInfo = userDetail;
  next();
};

const getAgencyProjectAdminIds = async (req, res, next) => {
  const { User } = AllModels();
  const agencyProjectAdminId = await User.findAll({
    where: {
      parent_id: res.userDetailInfo.parent_id,
    },
    attributes: ['id'],
  });
  res.agencyProjectAdminIds = agencyProjectAdminId.map((value) => value.id);
  next();
};
const isProjectAdmin = async (req, res, next) => {
  const userInfo = req.token;
  if (userInfo.role !== 'project_admin') {
    return res.status(403).json({ msg: 'Not authorize to do this action!' });
  }
  next();
};
module.exports = {
  getUserInfoByToken,
  getAgencyProjectAdminIds,
  isProjectAdmin,
};