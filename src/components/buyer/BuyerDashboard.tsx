import React, { useState } from 'react';
import { Package, PlusCircle } from 'lucide-react';
import { useAuction } from '../../contexts/AuctionContext';
import { useAuth } from '../../contexts/AuthContext';
import AddRequirementModal from './BuyerAddRequirementModal';

const BuyerDashboard: React.FC = () => {
  const { requirements, getRequirementBids, getLowestBid, getRequirementStatus } = useAuction();
  const { user } = useAuth();
  const [showAddRequirementModal, setShowAddRequirementModal] = useState(false);

  // Filter requirements to only show those created by the current buyer
  const buyerRequirements = requirements.filter(req => req.createdBy === user?.id);

  const handleShowAddRequirementModal = () => {
    setShowAddRequirementModal(true);
  };

  const handleCloseAddRequirementModal = () => {
    setShowAddRequirementModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Create and manage product requirements for bidding
          </p>
        </div>
        <button
          onClick={handleShowAddRequirementModal}
          className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm sm:text-base"
        >
          <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Add Product Requirement
        </button>
      </div>

      {buyerRequirements.length > 0 ? (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    MOQ
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Bids
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Lowest Bid
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buyerRequirements.map((req) => {
                  const status = getRequirementStatus(req);
                  const bids = getRequirementBids(req.id);
                  const lowestBid = getLowestBid(req.id);
                  return (
                    <tr 
                      key={req.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm sm:text-base font-medium text-gray-900">{req.productName}</div>
                            <div className="text-xs sm:text-sm text-gray-500">HS: {req.hsCode}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm">
                          <div>Start: {formatDate(req.startTime)}</div>
                          <div>End: {formatDate(req.endTime)}</div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800">
                        {req.moq.toLocaleString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800">
                        {bids.length}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {lowestBid ? (
                          <span className="text-xs sm:text-sm font-bold text-orange-600">
                            ${lowestBid.amount.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-xs sm:text-sm text-gray-500">No bids yet</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No product requirements yet</h3>
          <p className="text-gray-600 mb-6">Create your first product requirement to start receiving bids</p>
          <button
            onClick={handleShowAddRequirementModal}
            className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm sm:text-base"
          >
            <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Create Your First Requirement
          </button>
        </div>
      )}

      {showAddRequirementModal && (
        <AddRequirementModal onClose={handleCloseAddRequirementModal} />
      )}
    </div>
  );
};

export default BuyerDashboard;