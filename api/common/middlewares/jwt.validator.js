const jwt = require('jsonwebtoken');
const { sendError500, sendError401, sendError400, sendResp200 } = require('../helpers/httpStatus.helper');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const encode = async (req, res) => {
  try {
    const { id, role, parent_id } = res.user;
    const token = jwt.sign({ id, role, parent_id }, secret);
    return sendResp200(res, 'USER_LOGIN_SUCCESS', { token, user: res.user });
  } catch (error) {
    return sendError500(res);
  }
};

const decode = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return sendError401(res, 'AUTH_HEADER_MISSING');
    }
    const accessToken = authorization.split(' ');
    if (accessToken[0] !== 'Bearer') {
      return sendError401(res, 'UNAUTHENTICATED');
    }
    jwt.verify(accessToken[1], secret, (err, decoded) => {
      if (err) {
        return sendError401(res, 'UNAUTHENTICATED');
      }

      res.role = decoded.role;
      res.userId = res.user_id = decoded.id;
      res.parentId = decoded.parent_id;
      res.agencyId = res.agency_id = res.role === 'agency' ? res.userId : res.role === 'project_admin' ? res.parentId : null;
      req.token = decoded;
      if (req.method === 'GET' || req.originalUrl === '/api/project/filter') {
        const { limit, skip, keyword } = req.query;
        res.pagination = {
          limit: parseInt(limit) || 25,
          offset: parseInt(skip) || 0,
          search: keyword ? keyword.toLowerCase() : ''
        };
      }
      next();
    });
  } catch (error) {
    return sendError400(res);
  }
};

module.exports = {
  encode,
  decode,
};
