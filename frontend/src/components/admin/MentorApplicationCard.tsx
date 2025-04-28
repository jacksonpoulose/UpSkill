import React from 'react';
import { Mentor } from '../../types';
import Card, { CardHeader, CardBody, CardFooter } from '../common/Card';
import Button from '../common/Button';
import { User, Clock, CheckCircle, XCircle } from 'lucide-react';

interface MentorApplicationCardProps {
  mentor: Mentor;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isProcessing: boolean;
}

const MentorApplicationCard: React.FC<MentorApplicationCardProps> = ({
  mentor,
  onApprove,
  onReject,
  isProcessing,
}) => {
  return (
    <Card variant="admin" className="h-full">
      <CardHeader variant="admin">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{mentor.name}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Pending Approval
          </span>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
            {mentor.profilePicture ? (
              <img 
                src={mentor.profilePicture} 
                alt={mentor.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <User size={24} className="text-gray-500" />
            )}
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">{mentor.email}</p>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Clock size={14} className="mr-1" />
              <span>Applied: {new Date(mentor.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-sm text-gray-700 mb-1">Specializations:</h4>
          <div className="flex flex-wrap gap-2">
            {mentor.specialization.map((spec, index) => (
              <span 
                key={index}
                className="bg-admin-50 text-admin-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
        
        {mentor.experience && (
          <div className="mb-4">
            <h4 className="font-medium text-sm text-gray-700 mb-1">Experience:</h4>
            <p className="text-sm text-gray-600">{mentor.experience}</p>
          </div>
        )}
        
        {mentor.bio && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">Bio:</h4>
            <p className="text-sm text-gray-600">{mentor.bio}</p>
          </div>
        )}
      </CardBody>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<XCircle size={16} />}
          onClick={() => onReject(mentor._id)}
          disabled={isProcessing}
        >
          Reject
        </Button>
        
        <Button
          variant="admin"
          size="sm"
          leftIcon={<CheckCircle size={16} />}
          onClick={() => onApprove(mentor._id)}
          isLoading={isProcessing}
        >
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MentorApplicationCard;