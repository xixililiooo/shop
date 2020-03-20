<template>
  <div class="modal-trim">
      <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showImage: "",
      canvasRef: "",
      file:'',
      devicePixelRatio:window.devicePixelRatio ||1
    };
  },
  methods: {

    drawImage(image){
        this.canvasRef = this.refs.canvasRef;
        //获取canvas的上下文
        this.showImage = this.canvasRef.getContent('2d');
        //清除画布
        this.showImage.clearRect(0,0,this.canvasRef.width,this.canvasRef.height);
        //设置默认canvas元素的大小
        const canvasDefaultSize = 300;
        //初始化canvas画布大小，获取等比例缩放后的canvas的宽高尺寸
        let proportion = image.width/image.height,
        scale = proportion>1?canvasDefaultSize/image.width:canvasDefaultSize/image.height;
        canvasWidth = image.width*scale*this.devicePixelRatio,
        canvasHeight = image.height*scale*this.devicePixelRatio;
        this.canvasRef.width = canvasWidth;
        this.canvasRef.height = canvasHeight;
        this.canvasRef.style.width = canvasWidth/this.devicePixelRatio + 'px';
         this.canvasRef.style.height = canvasHeight/this.devicePixelRatio + 'px';
         this.image = image;//保存Image对象
         this.showImage.drawImage(image,0,0,this.canvasRef.width,this.canvasRef.height);  //根据图片绘制canvas
      },
    //根据给定的Image对象绘制图片
    filesInfo() {
      //读取图片原始信息的方法
      return new Promise((resolve, reject) => {
        let reader = new FileReader(); //创建一个FileReader对象
        let image = new Image(); //创建一个图片对象
        reader.readAsDataURL(this.file);
        reader.onload = function(e) {
          image.onload = function() {
            resolve({
              //最终得到图片的宽高
              width: image.width,
              height: image.height
            });
          };
          image.src = e.target.result;
          image.crossOrigin = "Anonymous"; //解决跨域问题
        };
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.modal-trim {
    overflow: hidden;
    position: relative;
  	/* 马赛克背景图 */
    background-image: url(https://s10.mogucdn.com/mlcdn/c45406/190723_3afckd96l9h4fh6lcb56117cld176_503x503.jpg);
    background-size: cover;
  	/* 使canvas始终居中 */
    canvas {
        cursor: default;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>