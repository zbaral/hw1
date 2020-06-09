import React, { Component } from 'react'
import config from './config.js'
const firebase = require('firebase')
var d3 = require("d3")


export class Graph extends Component {
    constructor(){
        super();
        this.state = {
            nodes: [],
            links: []
        }
    }

    //drag function
    drag = (simulation) => {
        function dragStarted(d) {
            if(!d3.event.active) {
                simulation.alpha(.5);
                simulation.alphaTarget(0.1).restart();
            }
            // d.fx = d.x;
            // d.fy = d.y;
        }
        function dragged(d){
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        function dragEnded(d){
            if(!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);
    }
    
    //creating the nodes
    chart(nodes, links){
        const width = 1920;
        const height = 1080;

        const obj_links = links.map(d => Object.create(d));
        const obj_nodes = nodes.map(d => Object.create(d));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 150, width, height]);

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));
            
        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => {return d.index; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width/2, height/2));

            
        this.state.nodes.forEach(node =>{
            var defs = svg.append('svg:defs');
            defs.append("svg:pattern")
                .attr("id", node.poster)
                .attr("width", 1)
                .attr("height", 1)
                .append("svg:image")
                .attr("xlink:href", node.poster)
                .attr("width", 200)
                .attr("height", 300)
                .attr("x", 0)
                .attr("y", -40);
        })

        const radius = (node) => {
            if (node.group === 'movie'){
                return 100
            }
            return 25
        }
        
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", radius)
            .attr("fill", function(d) {
                if (d.group === 'movie'){
                    console.log(d.title)
                    return "url(#" + d.poster + ")";
                }
                return d3.color("pink")
            })
            .call(this.drag(simulation));
        
        node.append("svg:title")
            .text(function(d) {
                return d.actor
            })
         
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        return svg.node();
    }


    componentDidMount() {
        const elem = document.getElementById("mysvg")
        

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
        let ref = firebase.database().ref('listNames/-M9H0gRllLRDYJ2XLHfN/movies')
        ref.on('value', snapshot => {
            const movies = snapshot.val()
            let newState = []
            let link = []
            let i = 0
            for(let movie in movies){
                let actorArr = movies[movie].movieInfo.Actors.split(', ')
                console.log(actorArr)
                for(let j=0; j < 4; j++){
                    newState.push({
                        actor: actorArr[j],
                        group: 'actor'
                    })
                }
                newState.push({
                    title: movies[movie].movieInfo.Title,
                    poster: movies[movie].movieInfo.Poster,
                    group: 'movie'
                })
                link.push({
                    source: i * 5,
                    target: (i * 5) + 4
                })
                link.push({
                    source: (i * 5) + 1,
                    target: (i * 5) + 4
                })
                link.push({
                    source: (i * 5) + 2,
                    target: (i * 5) + 4
                })
                link.push({
                    source: (i * 5) + 3,
                    target: (i * 5) + 4
                })
                i++
            }
            // for(let movie in movies){
            //     let actorArr = movies[movie].movieInfo.Actors.split(', ')
            //     for(let actor in actorArr){
            //         if(actor === newState.)
            //     }
            // }
            
            // link.push({
            //     source: 0,
            //     target: 4
            // })
            // link.push({
            //     source: 1,
            //     target: 4
            // })
            // link.push({
            //     source: 1,
            //     target: 9
            // })
            this.setState({
                nodes: newState,
                links: link
            })
            elem.appendChild(this.chart(this.state.nodes, this.state.links))
        })
    }

    render(){
        return (
            <div id="mysvg"><h1>Movies and Actors Graph</h1></div>
        )
    }
}

export default Graph;