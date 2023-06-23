import axios from 'axios';


      export async function  getUserInfo() {
        try {
          const response = await axios.get('http://localhost:5050/users', {headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkRvbGloX0xLQHlhbmRleC5jb20iLCJpZCI6NSwicm9sZXMiOlt7ImlkIjoyLCJ2YWx1ZSI6IkFETUlOIiwiZGVzY3JpcHRpb24iOiLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgCIsImNyZWF0ZWRBdCI6IjIwMjMtMDQtMjFUMTg6NTk6MzguNDI4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMjFUMTg6NTk6MzguNDI4WiIsIlVzZXJSb2xlcyI6eyJpZCI6Mywicm9sZUlkIjoyLCJ1c2VySWQiOjV9fV0sImlhdCI6MTY4MjIxMDgxMywiZXhwIjoxNjgyMjk3MjEzfQ.fbiCfUMgDKKkRMRmIwugy_NTTOH0JyAIlGHL2EJUCW0"
        }});
          const userInfo = response.data;
          return userInfo
        } catch (error) { }}
