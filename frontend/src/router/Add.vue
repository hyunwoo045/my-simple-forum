<template>
  <div class="container">
    <div class="input-area">
      <div class="mode-label">
        {{ mode === "modify" ? "수정" : "생성" }}
      </div>
      <div class="title">
        <input
          type="text"
          v-model="input.title"
          placeholder="제목을 입력하세요."
        />
      </div>
      <div class="input-type">
        <input
          type="radio"
          name="input_type"
          value="html"
          v-model="input.type"
        />
        HTML
        <input
          type="radio"
          name="input_type"
          value="markdown"
          v-model="input.type"
        />
        Markdown
      </div>

      <div class="description html" v-if="input.type === 'html'">
        <div class="btn-area">
          <button @click="styleHandler('bold')">
            <b>B</b>
          </button>
          <button @click="styleHandler('italic')">
            <i>I</i>
          </button>
          <button @click="styleHandler('underline')">
            <u>U</u>
          </button>
          <button @click="styleHandler('strikeThrough')">
            <s>S</s>
          </button>
          <button @click="styleHandler('insertOrderedList')">ol</button>
          <button @click="styleHandler('insertUnorderedList')">ul</button>
        </div>
        <div class="textarea" contenteditable="true" ref="desc">
          <p v-html="input.description"></p>
        </div>
      </div>

      <div class="description markdown" v-else-if="input.type === 'markdown'">
        <textarea class="textarea markdown" v-model="input.md_text"></textarea>
      </div>
    </div>

    <div class="button-area">
      <button class="cancel" @click="back">취소</button>
      <button class="submit" @click="createHandler">확인</button>
    </div>
  </div>
</template>

<script>
import defaultAPI from "~/core/defaultAPI";
import marked from "marked";

export default {
  name: "Add",
  props: {
    mode: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: -1,
    },
  },
  created() {
    if (this.id !== -1) {
      this.$http
        .get(`${defaultAPI.end_point}/content?id=${this.id}`)
        .then((response) => {
          const { title, description, type, md_text } = response.data[0];
          this.input = { title, description, type, md_text };
          if (md_text === null) this.input.md_text = "";
        });
    }
  },
  data() {
    return {
      input: {
        title: "",
        description: "",
        type: "html",
        md_text: "",
      },
    };
  },
  computed: {
    markdownToHTML() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        headerIds: false,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
      });
      return marked(this.input.md_text);
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    createHandler() {
      const lastInputDescription =
        this.input.type === "html"
          ? this.$refs.desc.innerHTML
          : this.markdownToHTML;
      if (this.input.title === "") {
        alert("제목을 입력하세요.");
        return;
      } else if (lastInputDescription === "") {
        alert("내용을 입력하세요.");
        return;
      }

      let url = "";
      if (this.mode === "modify") {
        url = `${defaultAPI.end_point}/content/modify`;
      } else {
        url = `${defaultAPI.end_point}/content/create`;
      }
      this.$http
        .post(url, {
          id: this.id,
          user_id: this.$store.state.user.id,
          title: this.input.title,
          description: lastInputDescription,
          type: this.input.type,
          md_text: this.input.md_text,
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    styleHandler(style) {
      document.execCommand(style);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.input-area {
  .mode-label {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 13px 20px 0;
    font-size: 22px;
    font-weight: 700;
  }
  .title {
    padding: 10px;
    height: 45px;
    input {
      height: 80%;
      width: 95%;
      padding: 0 10px;
      border: 1px solid rgb(134, 134, 134);
      border-radius: 4px;
      font-size: 15px;
    }
  }
  .input-type {
    padding: 0 10px;
  }
  .description {
    padding: 0 10px;
    height: 45vh;

    .textarea {
      padding: 10px;
      width: 95%;
      height: 95%;
      border: 1px solid rgb(134, 134, 134);
      border-radius: 4px;
      overflow: auto;
    }
    .textarea:focus {
      border: 2px solid black;
    }
    .textarea.markdown {
      margin-top: 25px;
    }
  }
}
.button-area {
  padding: 10px 10px;
  margin-top: 20px;
  position: relative;
  button {
    height: 40px;
    width: 90px;
    font-size: 14px;
    color: rgb(110, 110, 110);
    background-color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .cancel {
    border: 0.5px solid gray;
  }
  .submit {
    position: absolute;
    right: 24px;
    background-color: rgb(33, 167, 62);
    color: #fff;
  }
}
</style>
