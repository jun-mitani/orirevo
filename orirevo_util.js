
class Vec2d {
  x;
  y;
  constructor(x, y) {
    if (x == undefined) {
      this.x = 0;
      this.y = 0;
    } else if (y == undefined) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  set(x, y) {
    if (y == undefined) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
  }

  rotate(angleRad) {
    let _x = this.x;
    let _y = this.y;
    this.x = _x * Math.cos(angleRad) - _y * Math.sin(angleRad);
    this.y = _x * Math.sin(angleRad) + _y * Math.cos(angleRad);
  }

  static Cross(u, v) {
    return u.x * v.y - u.y * v.x;
  }

  static Sub(v0, v1) {
    return new Vec2d(v0.x - v1.x, v0.y - v1.y);
  }

  static Angle(v0, v1) {
    return Math.acos((v0.x * v1.x + v0.y * v1.y) / (Math.sqrt(v0.x *v0.x + v0.y *v0.y) * Math.sqrt(v1.x *v1.x + v1.y *v1.y)));
  }

}

class Vec3d {
  x;
  y;
  z;
  constructor(x, y, z) {
    if (x == undefined) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    } else if (y == undefined) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  set(x, y, z) {
    if (y == undefined) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
      }
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    let l = this.length();
    this.x /= l;
    this.y /= l;
    this.z /= l;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }

  cross(v) {
    return new Vec3d(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    )
  }

  setLen(l) {
    this.normalize();
    this.scale(l);
  }

  static Sub(v0, v1) {
    return new Vec3d(v0.x - v1.x, v0.y - v1.y, v0.z - v1.z);
  }


}

function cpScale(edges, scale) {
  for (let edge of edges) {
//    console.log(edge);
    edge.sp.scale(scale);
    edge.ep.scale(scale);
  }
}

function cpGetMinCoordinate(edges) {
  let minP = new Vec2d(edges[0].sp);

  for (let edge of edges) {
    minP.x = Math.min(minP.x, edge.sp.x, edge.ep.x);
    minP.y = Math.min(minP.y, edge.sp.y, edge.ep.y);
  }
  return minP;
}

function cpGetMaxCoordinate(edges) {
  let maxP = new Vec2d(edges[0].sp);

  for (let edge of edges) {
    maxP.x = Math.max(maxP.x, edge.sp.x, edge.ep.x);
    maxP.y = Math.max(maxP.y, edge.sp.y, edge.ep.y);
  }
  return maxP;
}

function getDistance(x0, y0, x1, y1) {
  if (x1 == undefined) {
    return Math.sqrt( (x0.x - y0.x) * (x0.x - y0.x) + (x0.y - y0.y) * (x0.y - y0.y));
  } else {
    return Math.sqrt( (x0-x1) *(x0-x1) + (y0-y1)*(y0-y1));
  }
}

function setData_Sphere(p, canvas_size) {
  let r = canvas_size * 0.4;
  let divNum = 24;
  p.push(new Vec2d(-r/4,r * 1.01));
  for(let i = 1; i <divNum; i++) {
      let x = Math.sin(i * Math.PI/divNum) * r;
      let y = Math.cos(i * Math.PI/divNum) * r;
      p.push(new Vec2d(x,y));
  }
  p.push(new Vec2d(-r/4,-r * 1.01));
}

function setData_Egg(p, canvas_size) {
  let r = canvas_size * 0.6;      
  let a = 0.5 * r;
  let b = 0.37 * r;
  let divNum = 24;

  for(let i = divNum; i >= 1; i--) {
    let x = Math.sin(i * Math.PI/divNum) * Math.cos(i * Math.PI/divNum / 4) * b;
    let y = Math.cos(i * Math.PI/divNum) * a;
    p.push(new Vec2d(x,y));
  }
  p.push(new Vec2d(-r*5/6, r/2));
}

function setData_WrappedSphere(p, canvas_size) {
  let r = canvas_size * 0.3;
  let divNum = 24;
  for(let i = 0; i <divNum; i++) {
      let x = Math.sin(i * Math.PI/divNum) * r;
      let y = -Math.cos(i * Math.PI/divNum) * r;
      p.push(new Vec2d(x,y));
  }
  p.push(new Vec2d(-1.75*r, r * 1.01));

}