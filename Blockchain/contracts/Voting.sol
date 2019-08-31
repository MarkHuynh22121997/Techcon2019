pragma solidity >=0.4.17 <0.6.0;

contract Voting {
    struct Candidate {
        string candidateName;
    }

    struct Vote {
        address from;
        string votedCandidate;
        bool exists;
    }
    Candidate[] public listOfCandidate;
    Vote[] public listOfVote;
    
    mapping(address => Vote) existedVotes;

    function addCandidate(string _name) public{
        Candidate memory newCandidate = Candidate(_name);
        listOfCandidate.push(newCandidate);
    }

    function vote(string _candidateName, address _voterAddress) public returns (string) {
        if(existedVotes[_voterAddress].exists) {
            return "You have already voted!";
        } else {
            Vote memory newVote = Vote(_voterAddress, _candidateName, true);
            listOfVote.push(newVote);
            return "Success";
        }
    }

    function getVoteCounting(string _candidateName) public view returns (uint) {
        uint numberOfVote = 0;
        for (uint i = 0; i < listOfVote.length; i++) {
            if(keccak256(listOfVote[i].votedCandidate) == keccak256(_candidateName)) {
                numberOfVote++;
            }
        }
        return numberOfVote;
    }

    
}
 