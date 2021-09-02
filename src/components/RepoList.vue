<template>
  <section @scroll="handleScroll" id="container">
    <div class="repo" v-for="(repo, index) in repos" :key="repo.id">
      <div class="repo-num">{{ index + 1 }}</div>
      <div class="Owner">
        <div class="avatar">
          <!-- the owner image -->
          <img :src="repo.owner.avatar_url" alt="Avatar image" />
        </div>
        <!-- the owner name -->
        <h3 class="user-name">{{ repo.owner.login }}</h3>
      </div>
      <div class="data">
        <div class="name-des">
          <!-- Repo link -->
          <a :href="repo.html_url">
            <!-- Repo Name -->
            <h3 class="name">{{ repo.name }}</h3>
          </a>
          <!-- Repo Descriotion -->
          <div class="description">{{ repo.description }}</div>
        </div>
        <div class="footer">
          <div class="stars">#Star : {{ repo.stargazers_count }}</div>
          <div class="issues">#Issue : {{ repo.open_issues_count }}</div>
        </div>
      </div>
    </div>
    <div v-if="network" class="loading"></div>
    <div v-else class="network-error">
      {{ networkError }} <br />
      check your internet connection then reload page
    </div>
  </section>
</template>

<script>
let pageNumber = 1;
export default {
  name: "RepoList",
  data() {
    return {
      repos: [], // array of repos need to be shown
      network: true, //boolean value for render the items according to the network
      networkError: String, //error that happened while loading data
    };
  },
  methods: {
    getData() {
      //get the data from github api with increased pagenumber
      fetch(
        `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${pageNumber}`
      )
        .then((response) => {
          if (response.ok) this.network = true;
          return response.json();
        })
        .then((data) => this.repos.push(...data.items), pageNumber++)
        .catch(
          //catch errors happend at fetch process
          (error) => ((this.networkError = error), (this.network = false))
        );
    },
    handleScroll(el) {
      if (
        // check if the user reached the end of scroll -20
        el.srcElement.offsetHeight + el.srcElement.scrollTop >=
        el.srcElement.scrollHeight - 20
      ) {
        this.getData();
      }
    },
  },
  mounted() {
    this.getData(); // getData() function called when RepoList load
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$blue: #2196f3; //save blue color in var to be used
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  // background: #f1f1f1;
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $blue;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #004b87;
}

#container {
  position: relative;
  z-index: 2; // to be over the black overlay layer
  padding: 20px;
  width: 80%;
  margin: auto;
  overflow: auto;
  height: calc(100% - 40px); //40 px of padding
  .repo {
    display: flex;
    border-bottom: 1px solid $blue;
    text-align: start;
    .repo-num {
      margin: auto 10px; // to center the element vertically
      width: 30px;
      text-align: center;
      background-color: $blue;
      font-size: 20px;
    }
    .Owner {
      text-align: center;
      padding-top: 10px;
      margin-right: 10px;
      width: 200px;
      .avatar {
        img {
          max-width: 125px;
          border-radius: 50%;
        }
        // img:hover {
        //   cursor: pointer;
        // }
      }
      .user-name {
        padding: 5px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .user-name:hover {
        overflow: visible;
      }
    }

    .data {
      width: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name-des {
        a {
          text-decoration: none; // to remove text underline from link
          h3 {
            text-transform: uppercase;
            color: #f9eb72;
          }
          h3:hover {
            color: $blue;
          }
        }
      }
      .footer {
        margin-left: auto;
        width: 100px;
      }
    }
  }
  .loading {
    margin: 20px auto;
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid $blue; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .network-error {
    text-transform: capitalize;
    line-height: 1.6;
    padding: 10px;
    font-size: 30px;
  }
}
</style>
